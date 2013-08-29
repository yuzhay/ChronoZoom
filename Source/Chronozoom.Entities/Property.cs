using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Chronozoom.Entities
{
    public class Property
    {
        [Key]
        [DataMember]
        public Guid Id
        {
            get;
            set;
        }

        [DataMember]
        [MaxLength(255)]
        public string MachineName
        {
            get;
            set;
        }

        [DataMember]
        [MaxLength(255)]
        public string Name
        {
            get;
            set;
        }

        [DataMember]
        public User User
        {
            get;
            set;
        }
    }
}
