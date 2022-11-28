import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  // AtScheduleIcon,
  AtStartIcon,
  IntervalIcon,
  AtEndIcon
} from '../../icons';
import ScheduleDisplay from '../../ScheduleDisplay';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    contentful: PropTypes.bool
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, contentful, title }
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className = ' tab-list-active';
    }

    if (activeTab === null) {
      className = ' ';
    }
    return (
      <div
        className={
          'flex justify-center furniture-border ' +
          className +
          ' ' +
          (contentful ? 'text-green-500 ' : ' ')
        }
        onClick={onClick}
        title={title}>
        {label === 'schedule' && (
          <span className="mt-1">
            <ScheduleDisplay />
          </span>
        )}
        {label === 'at start' && <AtStartIcon />}
        {label === 'interval' && <IntervalIcon />}
        {label === 'at finish' && <AtEndIcon />}
      </div>
    );
  }
}

export default Tab;
