using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using SistemaAcademico.Application.Auth;
using SistemaAcademico.Application.DTOs.request;
using SistemaAcademico.Application.Services;
using SistemaAcademico.Domain.Entities;

namespace SistemaAcademico.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly JwtService _jwtService;
        public StudentsController(IStudentService studentService , JwtService jwtService)
        {
            _studentService = studentService;
            _jwtService = jwtService;
        }
        [HttpPost]
         
        public async Task<IActionResult> RegisterStudent([FromBody] RegisterStudentRequest request)
        {
            try { 
               var student =  await _studentService.RegisterStudentAsync(request.Name, request.Email, request.SubjectIds);
                return Ok(new { message = "Estudiante registrado correctamente.", studentId = student.Id });
            }
            catch (Exception ex) 
            {
                return BadRequest(new { error = $"Error al registrar el estudiante: {ex.Message}" } );
            }
          
        }
        [HttpPost("cargar-subjects")]

        public async Task<IActionResult> RegisterSubjectsStudent([FromBody] RegisterStudentRequest request)
        {
            try
            {
                if (request.id <= 0)
                    return BadRequest(new {   error = $"Error al registrar los Subjects al estudiante: el id No existe"});


                var student = await _studentService.RegisterStudentSubjectsAsync(request.id,request.SubjectIds); 
                return Ok(new { message = "Subjects registrados correctamente.", studentId = student.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Error al registrar los Subjects al estudiante: {ex.Message}" });
            }

        }

        [HttpPost("login")]

        public async Task<IActionResult> LoginStudent([FromBody] StudentLoginRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Email))
                    return BadRequest("Email es requerido");


                var student = await _studentService.GetStudentByEmailAsync(request.Email);

                if (student == null)
                    return NotFound();

                var token =   _jwtService.GenerateToken(student);

                return Ok(new
                {
                    token,
                    student = new
                    {
                        student.Id,
                        student.Name,
                        student.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Error al realizar login al estudiante: {ex.Message}" });
            }

        }
        [HttpGet("{id}/subjects")]
        public async Task<IActionResult> GetSubjects(int id)
        {
            try
            {
                var Subjects = await _studentService.GetSubject(id);
                return Ok(Subjects);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Error al buscar los subjects del estudiante: {ex.Message}" });
            }
        }



        [HttpGet("{id}/partners")]
        public async Task<IActionResult> GetPartners(int id)
        {
            try
            {
                var Partners = await _studentService.GetPartners(id);
                return Ok(Partners);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Error al buscar compañero del estudiante: {ex.Message}" });
            }
        }


    }
}
