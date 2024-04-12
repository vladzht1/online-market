using Microsoft.AspNetCore.Mvc.Formatters;

using Market.Dtos;
using Market.Repositories;
using Market.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddControllers(options =>
{
    options.OutputFormatters.RemoveType<StringOutputFormatter>();
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IUserRepository>(new UserRepositoryImpl());
builder.Services.AddSingleton<IUserService>(context => new UserServiceImpl(context.GetRequiredService<IUserRepository>()));

var app = builder.Build();

// app.UseCors(builder => builder.AllowAnyOrigin());
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
