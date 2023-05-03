using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingAppAPI.DTOs;
using DatingAppAPI.Interfaces;
using DatingAppAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingAppAPI.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDTO> GetMemberByUsernameAsync(string username)
        {
            //the query only goes to the database with FirstOrDefaultAsync() method
            //The ProjectTo is method the AutoMapper Queryable Extension will make sure that only the properties in the Users table that will be map to a MemberDTO entity be selected from the database, thus improving the speed of the query

            var user = await _context.Users!.Where(x => x.UserName == username).ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();

            return user!;
        }

        public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
        {
            var users = await _context.Users.ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).ToListAsync();

            return users;
        }

        public async Task<AppUser> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users!.FindAsync(id);

            return user!;
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users!
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == username);

            return user!;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users!
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Users!.Update(user);
        }
    }
}
