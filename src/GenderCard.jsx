import { Component } from "react";

export default class GenderCard extends Component {
  handleClick = () => {
    window.location.href = this.props.navigateUrl;
  };

  render() {
    const { label, imageSrc } = this.props;

    return (
      <div
        className="genders__item"
        onClick={this.handleClick}
        style={{ cursor: "pointer" }}
      >
        <span className="genders__label">{label}</span>
        <img src={imageSrc} alt={label} className="genders__img" />
      </div>
    );
  }
}