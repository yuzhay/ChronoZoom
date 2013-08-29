namespace Chronozoom.Entities
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class FavoriteTimelines : DbMigration
    {
        public override void Up()
        {
            //CreateTable(
            //    "dbo.Properties",
            //    c => new
            //        {
            //            Id = c.Guid(nullable:false,identity:true),
            //            MachineName = c.String(nullable: false, maxLength: 255),
            //            Name = c.String(nullable: false, maxLength: 255),
            //            User_Id = c.Guid(nullable: true)
            //        })
            //    .PrimaryKey(t => t.Id)
            //    .ForeignKey("dbo.Users", t => t.User_Id, cascadeDelete: true)
            //    .Index(t => t.MachineName, unique: true);

            //CreateTable(
            //    "dbo.PropertyValues",
            //    c => new
            //    {
            //        Property_Id = c.Guid(nullable: false),
            //        Value = c.String(nullable: false)
            //    })
            //    .ForeignKey("dbo.Properties", t => t.Property_Id, cascadeDelete: true);
            }

        public override void Down()
        {
            //DropTable("dbo.PropertyValues");
            //DropTable("dbo.Properties");
        }
    }
}
