using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Chronozoom.Entities
{
    public class PropertyValue
    {
        [Key]
        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public Property Property { get; set; }
        
        [DataMember]
        public string Value { get; set; }
    }
}
