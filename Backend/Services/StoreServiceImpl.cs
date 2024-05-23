using LanguageExt.Common;

using MK.Dtos.Stores;
using MK.Exceptions;
using MK.Helpers.AddressHelpers;
using MK.Models;
using MK.Repositories;
using MK.Services;

public class StoreServiceImpl(IStoreRepository storeRepository, IAddressRepository addressRepository) : IStoreService
{
    private readonly IStoreRepository _storeRepository = storeRepository;
    private readonly IAddressRepository _addressRepository = addressRepository;

    public Task<Store[]> GetAll()
    {
        return _storeRepository.GetAll();
    }

    public async Task<Result<Store>> GetById(int storeId)
    {
        Store? store = await _storeRepository.GetById(storeId);

        if (store == null)
        {
            return new Result<Store>(new ResourceNotFoundException("Склад не найден"));
        }

        return store;
    }

    public async Task<Result<Store>> Create(CreateStoreDto createStoreDto)
    {
        var address = new Address()
        {
            CountryCode = createStoreDto.Address.countryCode,
            Region = createStoreDto.Address.region,
            City = createStoreDto.Address.city,
            Street = createStoreDto.Address.street,
            Building = createStoreDto.Address.building,
            Apartment = createStoreDto.Address.apartment,
            AddressIndex = createStoreDto.Address.addressIndex,
            Comment = createStoreDto.Address.comment,
        };

        var store = new Store(createStoreDto.Label, createStoreDto.Capacity, address);

        int? savedStoreId = await _storeRepository.Save(store);

        if (savedStoreId == null)
        {
            return new Result<Store>(new OperationFailedException("Не удалось создать склад"));
        }

        return store;
    }

    public async Task<Result<Store>> Update(UpdateStoreDto updateStoreDto)
    {
        Store? store = await _storeRepository.GetById(updateStoreDto.Id);

        if (store == null)
        {
            return new Result<Store>(new ResourceNotFoundException("Такой склад не существует"));
        }

        store.UpdateLabel(updateStoreDto.Label ?? store.Label);

        if (updateStoreDto.Address != null)
        {
            AddressHelpers.UpdateAddress(store.Address, updateStoreDto.Address);
        }

        bool updatedAddress = await _addressRepository.Update(store.Address);
        bool updatedStore = await _storeRepository.Update(store);

        if (!updatedAddress || !updatedStore)
        {
            return new Result<Store>(new OperationFailedException("Не удалось обновить данные склада"));
        }

        return store;
    }

    public async Task<Result<bool>> Delete(int marketId)
    {
        bool deleted = await _storeRepository.Delete(marketId);

        if (!deleted)
        {
            return new Result<bool>(new OperationFailedException("Не удалось удалить склад"));
        }

        return true;
    }
}
