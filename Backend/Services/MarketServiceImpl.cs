using LanguageExt.Common;

using MK.Dtos.Markets;
using MK.Exceptions;
using MK.Helpers.AddressHelpers;
using MK.Models;
using MK.Repositories;
using MK.Services;

public class MarketServiceImpl(IMarketRepository marketRepository, IAddressRepository addressRepository) : IMarketService
{
    private readonly IMarketRepository _marketRepository = marketRepository;
    private readonly IAddressRepository _addressRepository = addressRepository;

    public Task<Market[]> GetAll()
    {
        return _marketRepository.GetAll();
    }

    public async Task<Result<Market>> GetMarketById(int marketId)
    {
        Market? market = await _marketRepository.GetMarketById(marketId);

        if (market == null)
        {
            return new Result<Market>(new ResourceNotFoundException("Магазин не найден"));
        }

        return market;
    }

    public async Task<Result<Market>> Create(CreateMarketDto createMarketDto)
    {
        var address = new Address()
        {
            CountryCode = createMarketDto.address.countryCode,
            Region = createMarketDto.address.region,
            City = createMarketDto.address.city,
            Street = createMarketDto.address.street,
            Building = createMarketDto.address.building,
            Apartment = createMarketDto.address.apartment,
            AddressIndex = createMarketDto.address.addressIndex,
            Comment = createMarketDto.address.comment,
        };

        var market = new Market(createMarketDto.name, createMarketDto.description, createMarketDto.links, address);

        int? savedMarketId = await _marketRepository.Save(market);

        if (savedMarketId == null)
        {
            return new Result<Market>(new OperationFailedException("Не удалось создать магазин"));
        }

        return market;
    }

    public async Task<Result<Market>> Update(UpdateMarketDto updateMarketDto)
    {
        Market? market = await _marketRepository.GetMarketById(updateMarketDto.id);

        if (market == null)
        {
            return new Result<Market>(new ResourceNotFoundException("Такой магазин не существует"));
        }

        market.UpdateName(updateMarketDto.name ?? market.Name);
        market.UpdateDescription(updateMarketDto.description ?? market.Description);
        market.UpdateLinks(updateMarketDto.links ?? market.Links);

        if (updateMarketDto.address != null)
        {
            AddressHelpers.UpdateAddress(market.OfficeAddress, updateMarketDto.address);
        }

        // TODO: remove
        // market.OfficeAddress.CountryCode  = updateMarketDto.address?.countryCode  ?? market.OfficeAddress.CountryCode;
        // market.OfficeAddress.Region       = updateMarketDto.address?.region       ?? market.OfficeAddress.Region;
        // market.OfficeAddress.City         = updateMarketDto.address?.city         ?? market.OfficeAddress.City;
        // market.OfficeAddress.Street       = updateMarketDto.address?.street       ?? market.OfficeAddress.Street;
        // market.OfficeAddress.Building     = updateMarketDto.address?.building     ?? market.OfficeAddress.Building;
        // market.OfficeAddress.Apartment    = updateMarketDto.address?.apartment    ?? market.OfficeAddress.Apartment;
        // market.OfficeAddress.AddressIndex = updateMarketDto.address?.addressIndex ?? market.OfficeAddress.AddressIndex;
        // market.OfficeAddress.Comment      = updateMarketDto.address?.comment      ?? market.OfficeAddress.Comment;

        bool updatedAddress = await _addressRepository.Update(market.OfficeAddress);
        bool updatedMarket = await _marketRepository.Update(market);

        if (!updatedAddress || !updatedMarket)
        {
            return new Result<Market>(new OperationFailedException("Не удалось обновить данные магазина"));
        }

        return market;
    }

    public async Task<Result<bool>> Delete(int marketId)
    {
        bool deleted = await _marketRepository.Delete(marketId);

        if (!deleted)
        {
            return new Result<bool>(new OperationFailedException("Не удалось удалить магазин"));
        }

        return true;
    }
}
