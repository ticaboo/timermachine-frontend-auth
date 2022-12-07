import React from 'react';
import { notifyInPage } from '../../notifiy';
import ButtonAnimation from './ButtonAnimation';
import { CopyIcon } from '../../icons';
import { dataTestAttr, dataTestTagIds } from '../../../common/tags';

const CopyToClipboardButton = ({ textToCopy }) => {
  const clickHandler = () => {
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        notifyInPage(textToCopy, '');
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };
  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <div
        title="Copy To Clipboard"
        {...dataTestAttr(dataTestTagIds.copyToLibraryButton)}
        className=" ">
        <CopyIcon />
      </div>
    </ButtonAnimation>
  );
};

export default CopyToClipboardButton;
