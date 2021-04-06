using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    public class DonationsDbContext: DbContext
    {
        public DonationsDbContext(DbContextOptions<DonationsDbContext> options): base(options)
        {

        }

        public DbSet<DCandidate> DCandidates { get; set; }
    }
}
