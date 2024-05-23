namespace MK.Dtos.Products;

public class UpdateProductDto
{
    public int id { get; set; }
    public string? name { get; set; }
    public string? description { get; set; }
    public string[]? images { get; set; }
    public List<CreateProductPropertyDto> properties { get; set; } = [];
}
