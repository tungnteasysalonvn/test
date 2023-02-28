using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server_2._2.Data;
using server_2._2.Models;
using System;
using System.Linq;

namespace server_2._2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogApi : ControllerBase
    {
        public readonly MyDbContext _db;
        public BlogApi(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var blogs = _db.Blogs.ToList();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var blogCurrent = _db.Blogs.FirstOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                return Ok(blogCurrent);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult Create(BlogModel blog)
        {
            try
            {
                var blogNew = new Blog
                {
                    Id = Guid.NewGuid(),
                    Title = blog.Title,
                    Author = blog.Author,
                    ImageURL = blog.ImageUrl,
                    Description = blog.Description
                };
                _db.Add(blogNew);
                _db.SaveChanges();
                return Ok(blogNew);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, BlogModel blogUd)
        {
            var blogCurrent = _db.Blogs.SingleOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                blogCurrent.Title = blogUd.Title;
                blogCurrent.Description = blogUd.Description;
                blogCurrent.ImageURL = blogUd.ImageUrl;
                _db.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var blogCurrent = _db.Blogs.SingleOrDefault(blog => blog.Id == Guid.Parse(id));
            if (blogCurrent != null)
            {
                _db.Remove(blogCurrent);
                _db.SaveChanges();

            }
            return NoContent();
        }
    }
}
