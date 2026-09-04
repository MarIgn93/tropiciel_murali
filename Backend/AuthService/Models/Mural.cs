namespace AuthService.Models
{
    public class Mural
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUri { get; set; }

        // NOWE POLA NA WSPÓ£RZÊDNE GPS
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}