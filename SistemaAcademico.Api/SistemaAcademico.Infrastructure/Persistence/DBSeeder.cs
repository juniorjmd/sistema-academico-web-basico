using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Infrastructure.Persistence
{
    public static  class DBSeeder
    {
        public static async Task Seed(SisAcademicoDbContext context)
        {

            if (!context.Professors.Any())
            {
                context.Professors.AddRange(
                    new Professor { Name = "Profesor 1" },
                    new Professor { Name = "Profesor 2" },
                    new Professor { Name = "Profesor 3" },
                    new Professor { Name = "Profesor 4" },
                    new Professor { Name = "Profesor 5" }
                );

                await context.SaveChangesAsync();
            }

            var professors = context.Professors.ToList();  
            if (!context.Subjects.Any())
            {
                context.Subjects.AddRange(
                    new Subject { Name = "Matemáticas 1", ProfessorId = professors[0].Id },
                    new Subject { Name = "Matemáticas 2", ProfessorId = professors[0].Id },
                    new Subject { Name = "Historia Colombia", ProfessorId = professors[1].Id },
                    new Subject { Name = "Historia Inglés", ProfessorId = professors[1].Id },
                    new Subject { Name = "Ciencias", ProfessorId = professors[2].Id },
                    new Subject { Name = "Química", ProfessorId = professors[2].Id },
                    new Subject { Name = "Literatura Inglesa", ProfessorId = professors[3].Id },
                    new Subject { Name = "Literatura Hispana", ProfessorId = professors[3].Id },
                    new Subject { Name = "Dibujo", ProfessorId = professors[4].Id },
                    new Subject { Name = "Música", ProfessorId = professors[4].Id }
                );

                await context.SaveChangesAsync();
            }

            var subjects = context.Subjects.ToList();  
            if (!context.Students.Any())
            {
                context.Students.AddRange(
                    new Student { Name = "Pedro", Email = "p1@test.com" },
                    new Student { Name = "Juan", Email = "p2@test.com" },
                    new Student { Name = "Maria", Email = "p3@test.com" },
                    new Student { Name = "Jose", Email = "p4@test.com" },
                    new Student { Name = "Yesid", Email = "p5@test.com" }
                );

                await context.SaveChangesAsync();
            }

            var students = context.Students.ToList();  
            if (!context.StudentSubjects.Any())
            {
                context.StudentSubjects.AddRange(
                    new StudentSubject { StudentId = students[0].Id, SubjectId = subjects[0].Id },
                    new StudentSubject { StudentId = students[0].Id, SubjectId = subjects[2].Id },
                    new StudentSubject { StudentId = students[1].Id, SubjectId = subjects[1].Id },
                    new StudentSubject { StudentId = students[2].Id, SubjectId = subjects[3].Id },
                    new StudentSubject { StudentId = students[3].Id, SubjectId = subjects[4].Id }
                );

                await context.SaveChangesAsync();
            }
        }

    }
}
