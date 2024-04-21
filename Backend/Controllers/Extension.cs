using Microsoft.AspNetCore.Mvc;
using LanguageExt.Common;

using Market.Dtos;
using Market.Exceptions;

namespace Market.Controllers;

public static class ControllerExtension
{
    public static IActionResult ToActionResult<TResult, TContract>(
        this Result<TResult> result, Func<TResult, TContract> mapper)
    {
        return result.Match<IActionResult>(
            resultObject =>
            {
                return new OkObjectResult(mapper(resultObject));
            },
            exception =>
            {
                Console.WriteLine($"RESPONSE ERROR: {exception.Message}");

                if (exception is ResourceNotFoundException)
                {
                    return new NotFoundObjectResult(new ReturnDto(StatusCodes.Status404NotFound, exception.Message).Content);
                }
                else if (exception is OperationFailedException)
                {
                    var response = new ObjectResult(new ReturnDto(StatusCodes.Status500InternalServerError, exception.Message).Content)
                    {
                        StatusCode = StatusCodes.Status500InternalServerError
                    };

                    return response;
                }

                return new BadRequestObjectResult(new ReturnDto(400, exception.Message).Content);
            }
        );
    }
}
