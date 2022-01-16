pragma solidity ^0.8.0;

contract Deal {
    address public user0;
    address public user1;
    address public token0;
    address public token1;
    uint256 public amount0;
    uint256 public amount1;

    event DepositToken0(uint256 amount);
    event DepositToken1(uint256 amount);
    event Claimed(address user);

    modifier claimable() {
        require(IERC20(token0).balanceOf(address(this)) >= amount0, "Deal conditions aren't met.");
        require(IERC20(token1).balanceOf(address(this)) >= amount1, "Deal conditions aren't met.");
        _;
    }

    constructor(address _user0, address _user1, address _token0, address _token1, uint256 _amount0, uint256 _amount1) {
        user0 = _user0;
        user1 = _user1;
        token0 = _token0;
        token1 = _token1;
        amount0 = _amount0;
        amount1 = _amount1;
    }

    function depositToken0(uint256 amount) external {
        require(msg.sender == user0, "You cannot deposit tokens.");

        if(amount > amount0) {
            amount = amount0;
        }

        IERC20(token0).transferFrom(msg.sender, address(this), amount);

        emit DepositToken0(amount);
    }

    function depositToken1(uint256 amount) external {
        require(msg.sender == user1, "You cannot deposit tokens.");

        if(amount > amount1) {
            amount = amount1;
        }

        IERC20(token1).transferFrom(msg.sender, address(this), amount);

        emit DepositToken1(amount);
    }

    function claimForBoth() external claimable {
        IERC20(token0).transfer(user1, amount0);
        IERC20(token1).transfer(user0, amount1);

        emit Claimed(address(0));
    }

    function claimForUser0() external claimable {
        IERC20(token1).transfer(user0, amount1);

        emit Claimed(user0);
    }

    function claimForUser1() external claimable {
        IERC20(token0).transfer(user1, amount0);

        emit Claimed(user0);
    }
}
