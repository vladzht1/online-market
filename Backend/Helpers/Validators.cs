namespace MK.Helpers.Validators;

public static class StringValidator
{
    public static bool IsNonEmpty(string value)
    {
        return value.Trim().Length != 0;
    }
}
