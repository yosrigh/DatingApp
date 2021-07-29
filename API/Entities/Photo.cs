using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo            
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        //To Full define the relation between photos and users table => to have not nullable foreign key and cascade delete => we should add  two attributs: the referent class and the foreign key column
        public AppUser AppUser { get; set; } 
        public int AppUserId { get; set; }
    }
}