var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

propSchema = new Schema({
                   type: String,
                    properties:
                     { us_congress: String,
                       mapped: Boolean,
                       global_id: String,
                       zipcode: String,
                       acres: Number,
                       location: String,
                       typecategory: String,
                       commission: Date,
                       url: String,
                       permitpare: String,
                       eapply: String,
                       parentid: String,
                       gispropnum: String,
                       acquisition: Date,
                       retired: Boolean,
                       subcategory: String,
                       jurisdiction: String,
                       objectid: String,
                       communityb: String,
                       name311: String,
                       permitdist: String,
                       pip_ratabl: String,
                       department: String,
                       precinct: String,
                       permit: String,
                       omppropid: String,
                       gisobjid: String,
                       signname: String,
                       address: String,
                       nys_assemb: String,
                       class: String,
                       nys_senate: String,
                       councildis: String,
                       borough: String,
                       waterfront: String,
                       drink_fount: Boolean,
                       df_info: [
                        {
                          num: Number,
                          site_id: String,
                          site_name: String
                        }
                       ],
                       bathrooms: Boolean,
                       br_info: [
                         {
                          site_name: String,
                          site_location: String,
                          year_round: Boolean,
                          accessible: Boolean
                          }
                       ] },
                    geometry: { type: String, coordinates: [[]] },
                    created: Date

                  //
}, { typeKey: '$type' })

Property = mongoose.model('properties', propSchema);

module.exports.User = Property;
module.exports.Schema = propSchema;
