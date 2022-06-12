import { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  static defaultProps = {
    name: "기본 이름",
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        내 이름은 {name} <br />
        children 값은 {children} <br />
        제가 좋아하는 숫자는 {favoriteNumber}
      </div>
    );
  }
}

// MyComponent.defaultProps = {
//     name: '기본 이름'
// }

// MyComponent.propTypes = {
//     name: PropTypes.string,
//     favoriteNumber: PropTypes.number.isRequired
// }

export default MyComponent;
