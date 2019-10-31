import * as React from 'react';
import * as styles from './lazy-image.scss';
import bind from 'bind-decorator';

interface LazyImageProps {
  src: string;
  className?: string;
  isDeferred?: boolean;
  alt?: string;
}

interface LazyImageState {
  isLoaded: boolean;
}

export class LazyImage extends React.Component<LazyImageProps, LazyImageState> {

  constructor(props: LazyImageProps) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  @bind
  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render(): JSX.Element {
    const isLoaded = this.state.isLoaded;

    return <img
      src={ !!this.props.isDeferred ? '' : this.props.src }
      onLoad={ this.handleLoad }
      alt={this.props.alt || ''}

      className={ styles.lazyImage +
        (!!this.props.className ? ' ' + this.props.className : '') +
        (isLoaded ? ' ' + styles.lazyImageIsLoaded : '')
      }
    />;
  }
}
