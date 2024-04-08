using System.Collections;

namespace Market.Dtos;

public class ReturnDto
{
    private Hashtable _content = [];

    public ReturnDto(int statusCode)
    {
        Content["statusCode"] = statusCode;
    }

    public ReturnDto(int statusCode, string message)
        : this(statusCode)
    {
        Content["message"] = message;
    }

    public ReturnDto(int statusCode, string message, string[] errors)
        : this(statusCode, message)
    {
        Content["errors"] = errors;
    }

    public ReturnDto(int statusCode, string message, Hashtable errors)
        : this(statusCode, message)
    {
        Content["errors"] = errors;
    }

    public Hashtable Content { get => _content; private set { _content = value; } }
}
