/**
 * Created by jrjung on 2017-05-04.
 */

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

export default class BtnMenus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: props.show,
      fold: false
    };
  }

  render() {
    return (
        <div className="BtnMenusContainer">
          <FloatingActionButton name="Fold">
            <AddIcon/>
          </FloatingActionButton>
        </div>
    );
  }
}
