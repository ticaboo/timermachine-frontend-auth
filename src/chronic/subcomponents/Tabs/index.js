import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array)
  };

  // constructor(props) {
  //   super(props);

  // this.state = {
  //   activeTab: this.props.activeTab //null //this.props.children[3].props.label
  // };
  // }

  onClickTabItem = (tab) => {
    if (this.props.activeTab === tab) {
      this.props.setActiveTab(null);
    } else {
      this.props.setActiveTab(tab);
    }
  };

  render() {
    const {
      onClickTabItem,
      props: { children, activeTab }
      //state: { props['activeTab'] }
      //activeTab : {props.activeTab}
    } = this;

    return (
      <div className="tabs pt-1 ">
        <div className="tab-list grid grid-cols-4 gap-0 content-centre  ">
          {children.map((child) => {
            const { label, title, contentful } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                title={title}
                contentful={contentful}
                onClick={onClickTabItem}
              />
            );
          })}
        </div>
        <div>
          {/* xclassName="settingsCard absolute z-1 top-[305px] furniture-border border-t-0 w-[200px]" */}
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
