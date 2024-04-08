namespace Market.Exceptions;

public class ResourceNotFoundException(string message) : Exception(message)
{
}

public class OperationFailedException(string message) : Exception(message)
{
}
