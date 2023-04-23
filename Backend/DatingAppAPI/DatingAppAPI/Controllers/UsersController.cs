﻿using DatingAppAPI.Data;
using DatingAppAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAppAPI.Controllers
{
    public class UsersController : BaseController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        [HttpPost]
        public async Task Post([FromBody]AppUser appUser)
        {
            _context.Users.Add(appUser);
            await _context.SaveChangesAsync();
        }
    }
}
