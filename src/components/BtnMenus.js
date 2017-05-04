/**
 * Created by jrjung on 2017-05-04.
 */

import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

let _this;
let foldTimer, unfoldTimer;


export default class BtnMenus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: props.show,
      unfold: false,
      foldBtnStyle: {}
    };

    _this = this;
  }

  toggleFold() {
    _this.setState({unfold: !_this.state.unfold}, () => {
      if(_this.state.unfold){
        _this.setState({foldBtnStyle: {display: 'flex', height: 0}}, () => {
          clearTimeout(foldTimer);
          unfoldTimer = setTimeout(() => {
            _this.setState({foldBtnStyle: {display: 'flex', height: 140}});
          }, 10);
        });
      } else {
        _this.setState({foldBtnStyle: {display: 'flex', height: 0}});
        clearTimeout(unfoldTimer);
        foldTimer = setTimeout(() => {
          _this.setState({foldBtnStyle: {display: 'none'}});
        }, 450);
      }
    });
  }

  GetBtnRotateStyle() {
    try {
      let _try = _this.state.unfold;
    } catch(e){
      return {};
    }
    if(!_this.state) {
      return {};
    } else {
      return {
        transform: `rotateZ(${_this.state.unfold?45:0}deg)`,
        position: 'relative',
        zIndex: 9
      };
    }
  }

  GetBtnFoldStyle() {

  }

  render() {
    return (
        <div className="BtnMenusContainer">
          <div
              className="BtnMenusFold"
              style={this.state.foldBtnStyle}
          >
            <FloatingActionButton
                name="ChangeName"
                style={{
                  position: 'absolute',
                  top: 0
                }}
            >
              <AddIcon style={{width:32}}/>
            </FloatingActionButton>
            <FloatingActionButton
                name="RollDice"
                style={{
                  position: 'absolute',
                  top: '50%'
                }}
            >
              <AddIcon style={{width:32}}/>
            </FloatingActionButton>
          </div>
          <FloatingActionButton
              name="Fold"
              style={this.GetBtnRotateStyle()}
              onClick={this.toggleFold}
          >
            <AddIcon style={{width:32}}/>
          </FloatingActionButton>
        </div>
    );
  }
}
