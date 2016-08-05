/**
 * Created by lyh on 8/5/16.
 */

module.exports={
  connection: 'someMongodbServer',
  tableName: 'xd_autotest_doc',
  attributes: {
    id:{
      type:'string',
      required:true,
      unique:true,
      primaryKey:true
    }
  },
  name:{
    type:'string',
    required:true,
    unique:true
  }
}
