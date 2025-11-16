// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DatyToken
 * @dev Simple token purchase contract for DATY tokens
 * Users can buy tokens with ETH on Base Sepolia testnet
 */
contract DatyToken {
    // Mapping from address to token balance
    mapping(address => uint256) private balances;

    // Token price: 1 ETH = 100,000 DATY tokens
    uint256 public constant TOKEN_PRICE = 100000;

    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 ethPaid);
    event TokensTransferred(address indexed from, address indexed to, uint256 amount);

    /**
     * @dev Buy tokens with ETH
     * @param amount Number of DATY tokens to purchase
     */
    function buyTokens(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");

        // Calculate required ETH
        uint256 requiredEth = (amount * 1 ether) / TOKEN_PRICE;
        require(msg.value >= requiredEth, "Insufficient ETH sent");

        // Add tokens to buyer's balance
        balances[msg.sender] += amount;

        // Refund excess ETH if any
        if (msg.value > requiredEth) {
            payable(msg.sender).transfer(msg.value - requiredEth);
        }

        emit TokensPurchased(msg.sender, amount, requiredEth);
    }

    /**
     * @dev Get token balance of an address
     * @param account Address to check balance
     * @return Token balance
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    /**
     * @dev Transfer tokens to another address
     * @param to Recipient address
     * @param amount Amount of tokens to transfer
     */
    function transfer(address to, uint256 amount) external {
        require(to != address(0), "Transfer to zero address");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit TokensTransferred(msg.sender, to, amount);
    }

    /**
     * @dev Withdraw ETH from contract (only for testing)
     */
    function withdraw() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}
