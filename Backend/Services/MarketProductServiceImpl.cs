using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Repositories;
using MK.Exceptions;
using MK.Models;

namespace MK.Services;

public class MarketProductServiceImpl(
    IMarketProductRepository marketProductRepository,
    IProductRepository productRepository,
    IStoreRepository storeRepository,
    IMarketRepository marketRepository
) : IMarketProductService
{
    private readonly IMarketProductRepository _marketProductRepository = marketProductRepository;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly IStoreRepository _storeRepository = storeRepository;
    private readonly IMarketRepository _marketRepository = marketRepository;

    public Task<AvailableProduct[]> GetAll(MarketProductSearchQueryDto marketProductSearchQueryDto)
    {
        return _marketProductRepository.GetAll(marketProductSearchQueryDto);
    }

    public async Task<Result<AvailableProduct>> GetById(int marketProductId)
    {
        AvailableProduct? availableProduct = await _marketProductRepository.GetById(marketProductId);

        if (availableProduct == null)
        {
            return new Result<AvailableProduct>(new ResourceNotFoundException("Товар не найден в этом магазине"));
        }

        return availableProduct;
    }

    public async Task<Result<AvailableProduct>> Create(AddProductToMarketDto createMarketProductDto)
    {
        if (createMarketProductDto.Quantity < 1)
        {
            return new Result<AvailableProduct>(new BadInputException("Количество не может быть меньше единицы"));
        }

        Product? product = await _productRepository.GetById(createMarketProductDto.ProductId);
        Market? market = await _marketRepository.GetById(createMarketProductDto.MarketId);
        Store? store = await _storeRepository.GetById(createMarketProductDto.StoreId);

        string? notFoundErrorMessage = null;

        if (product == null)
        {
            notFoundErrorMessage = "Продукт не найден";
        }
        else if (market == null)
        {
            notFoundErrorMessage = "Магазин не найден";
        }
        else if (store == null)
        {
            notFoundErrorMessage = "Склад не найден";
        }

        if (notFoundErrorMessage != null)
        {
            return new Result<AvailableProduct>(new ResourceNotFoundException(notFoundErrorMessage));
        }

        var price = new Price(createMarketProductDto.Price.Value, createMarketProductDto.Price.Currency, product!, market!);
        var marketProduct = new AvailableProduct(store!, market!, price, product!, createMarketProductDto.Quantity);

        int? savedMarketProductId = await _marketProductRepository.Save(marketProduct);

        if (savedMarketProductId == null)
        {
            return new Result<AvailableProduct>(new OperationFailedException("Не удалось добавить товар в магазин"));
        }

        return marketProduct;
    }

    public async Task<Result<AvailableProduct>> Update(UpdateMarketProductDto updateMarketProductDto)
    {
        AvailableProduct? product = await _marketProductRepository.GetById(updateMarketProductDto.Id);

        if (product == null)
        {
            return new Result<AvailableProduct>(new ResourceNotFoundException("Такой товар не существует"));
        }

        if (updateMarketProductDto.Quantity != null)
        {
            product.Quantity = (int) updateMarketProductDto.Quantity;
        }

        if (await _marketProductRepository.Update(product) == false) {
            return new Result<AvailableProduct>(new OperationFailedException("Не удалось обновить продукт"));
        }

        return product;
    }

    public async Task<Result<bool>> Delete(int marketProductId)
    {
        bool deleted = await _marketProductRepository.Delete(marketProductId);

        if (!deleted)
        {
            return new Result<bool>(new OperationFailedException("Не удалось удалить товар из магазина"));
        }

        return true;
    }
}
