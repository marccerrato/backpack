import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M13.365 8h-3.071l2.328-6.013C12.81 1.501 12.39 1 11.795 1H6.716c-.4 0-.748.234-.845.568l-2.178 7.5c-.137.473.279.932.845.932h2.677l-1.867 6.492c-.119.414.495.687.83.369l7.908-7.498C14.642 8.836 14.2 8 13.365 8z" /></svg>;
  }

}