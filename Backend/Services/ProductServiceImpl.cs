using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Repositories;
using MK.Models;
using MK.Exceptions;

namespace MK.Services;

public class ProductServiceImpl(IProductRepository productRepository) : IProductService
{
    private readonly IProductRepository _productRepository = productRepository;

    public Task<Product[]> GetAll()
    {
        return _productRepository.GetAll();
    }

    public async Task<Result<Product>> GetById(int productId)
    {
        Product? product = await _productRepository.GetById(productId);

        if (product == null)
        {
            return new Result<Product>(new ResourceNotFoundException("Продукт не найден"));
        }

        return product;
    }

    public async Task<Result<Product>> Create(CreateProductDto createProductDto)
    {
        var product = new Product(createProductDto.name, createProductDto.description);

        product.AddImages(createProductDto.images.ToArray());
        product.AddProperties(createProductDto.properties.ToArray());

        int? savedProductId = await _productRepository.Save(product);

        if (savedProductId == null)
        {
            return new Result<Product>(new OperationFailedException("Не удалось создать продукт"));
        }

        return product;
    }

    public async Task<Result<Product>> Update(UpdateProductDto updateProductDto)
    {
        Product? product = await _productRepository.GetById(updateProductDto.id);

        if (product == null)
        {
            return new Result<Product>(new ResourceNotFoundException("Такой продукт не существует"));
        }

        product.UpdateName(updateProductDto.name ?? "");
        product.UpdateDescription(updateProductDto.description ?? "");

        product.AddProperties(updateProductDto.properties.ToArray());
        product.AddImages(updateProductDto.images?.Map(image => new ProductImage(image, product)).ToArray() ?? product.Images.ToArray(), false);

        bool updatedProduct = await _productRepository.Update(product);

        if (!updatedProduct)
        {
            return new Result<Product>(new OperationFailedException("Не удалось обновить данные продукта"));
        }

        return product;
    }

    public async Task<Result<bool>> Delete(int productId)
    {
        bool deleted = await _productRepository.Delete(productId);

        if (!deleted)
        {
            return new Result<bool>(new OperationFailedException("Не удалось удалить продукт"));
        }

        return true;
    }
}
