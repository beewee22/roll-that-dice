/**
 * Created by jrjung on 2017-05-02.
 */

let _name = '';
let _created = null;

class User {

  create(name) {
    _name = name;
    _created = new Date();
  }

  set name(name) {
    _name = name;
  }

  get name() {
    return _name;
  }

  get created() {
    return _created;
  }
}

let Me = new User();

export default Me;