import React from 'react';

export const BlockWalletInfo = ({ wallet }) => {
  return (
    <div className="wallet-balance-container">
      <div className="wallet-balance-title">
        <span>Block Wallet Info</span>
      </div>
      <ul>
        {wallet.accounts[0] && (
          <>
            <li>
              <span>Account:</span>
              <span>{wallet.accounts[0]}</span>
            </li>
            <li>
              <span>Balance:</span>
              <span>{wallet.balance}</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
