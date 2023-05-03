using DatingAppAPI.Data;
using DatingAppAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppAPI.Controllers
{
    public class ErrorController : BaseController
    {
        private readonly DataContext _context;

        public ErrorController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "This is a secret";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var guid = Guid.NewGuid();

            var thing = _context.Users?.Find(guid);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var guid = Guid.NewGuid();

            var thing = _context.Users!.Find(guid);

            var thingToReturn = thing!.ToString();

            return thingToReturn!;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
    }
}
