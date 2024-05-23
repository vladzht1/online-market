namespace MK.Dtos.Products;

public class CreateProductDto
{
    public string name { get; set; } = null!;
    public string description { get; set; } = null!;
    public List<string> images { get; set; } = null!;
    public List<CreateProductPropertyDto> properties { get; set; } = null!;
}

public class CreateProductPropertyDto
{
    public string name { get; set; } = null!;
    public string value { get; set; } = null!;
}
