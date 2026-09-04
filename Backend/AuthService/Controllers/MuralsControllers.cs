using Microsoft.AspNetCore.Mvc;
using AuthService.Models;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MuralsController : ControllerBase
    {
        // Nasza "baza danych" w pamiêci (lista), która przetrwa tak d³ugo, jak w³¹czony jest serwer
        private static List<Mural> _murals = new List<Mural>();
        private static int _nextId = 1;

        // METODA 2 z 3: GET (Pobieranie listy murali na mapê)
        [HttpGet]
        public IActionResult GetMurals()
        {
            return Ok(_murals);
        }

        // METODA 3 z 3: POST (Zapisywanie nowego muralu z formularza)
        [HttpPost]
        public IActionResult AddMural([FromBody] Mural newMural)
        {
            newMural.Id = _nextId++;
            _murals.Add(newMural);

            return Ok(newMural); // Zwracamy zapisany mural z powrotem jako potwierdzenie
        }
    }
}