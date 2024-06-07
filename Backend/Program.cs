using Microsoft.AspNetCore.Mvc.Formatters;

using MK.Dtos;
using MK.Repositories;
using MK.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddCors();

builder.Services.AddControllers(options =>
{
    options.OutputFormatters.RemoveType<StringOutputFormatter>();
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IUserRepository>(new UserRepositoryImpl());
builder.Services.AddSingleton<IMarketRepository>(new MarketRepositoryImpl());
builder.Services.AddSingleton<IAddressRepository>(new AddressRepositoryImpl());
builder.Services.AddSingleton<IStoreRepository>(new StoreRepositoryImpl());
builder.Services.AddSingleton<IProductRepository>(new ProductRepositoryImpl());
builder.Services.AddSingleton<IMarketProductRepository>(new MarketProductRepositoryImpl());

builder.Services.AddSingleton<IUserService>(context => new UserServiceImpl(context.GetRequiredService<IUserRepository>()));
builder.Services.AddSingleton<IProductService>(context => new ProductServiceImpl(context.GetRequiredService<IProductRepository>()));
builder.Services.AddSingleton<IStoreService>(context => new StoreServiceImpl(
    context.GetRequiredService<IStoreRepository>(),
    context.GetRequiredService<IAddressRepository>()
));
builder.Services.AddSingleton<IMarketService>(context => new MarketServiceImpl(
    context.GetRequiredService<IMarketRepository>(),
    context.GetRequiredService<IAddressRepository>(),
    context.GetRequiredService<IMarketProductRepository>()
));
builder.Services.AddSingleton<IMarketProductService>(context => new MarketProductServiceImpl(
    context.GetRequiredService<IMarketProductRepository>(),
    context.GetRequiredService<IProductRepository>(),
    context.GetRequiredService<IStoreRepository>(),
    context.GetRequiredService<IMarketRepository>()
));


var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception exception)
    {
        Console.WriteLine("Error: ", exception.Message);
        Console.WriteLine(exception);

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(new ReturnDto(StatusCodes.Status500InternalServerError, "Внутренняя ошибка сервера").Content);

        return;
    }
});

app.MapControllers();
app.Run();
