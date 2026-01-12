using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaAcademico.Application.Services;

namespace SistemaAcademico.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessorsController : ControllerBase
    {
        private IProfessorService _professorService;

        public ProfessorsController(IProfessorService professorService)
        {
            _professorService = professorService;
        }   

        [HttpGet]
        public async Task<IActionResult> GetAllProfessors()
        {   
            var professors = await _professorService.GetAllAsync();
            return Ok(professors);
        }
    }
}
