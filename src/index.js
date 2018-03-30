'use strict';

import React from 'react';
import Markdown from 'remarkable';

class Remarkable extends React.Component {

  render() {
    var Container = this.props.container;

    return (
      <Container>
        {this.content()}
      </Container>
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options || nextProps.plugins !== this.props.plugins) {
      this.md = new Markdown(nextProps.options);
      nextProps.plugins.forEach((elem) => {
        this.md.use(elem)
      })
    }
  }

  content() {
    if (this.props.source) {
      return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(this.props.source) }} />;
    }
    else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {
          return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(child) }} />;
        }
        else {
          return child;
        }
      });
    }
  }

  renderMarkdown(source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);
      this.props.plugins.forEach((elem) => {
        this.md.use(elem)
      })
    }

    return this.md.render(source);
  }
}

Remarkable.defaultProps = {
  container: 'div',
  options: {},
  plugins: []
};

export default Remarkable;
