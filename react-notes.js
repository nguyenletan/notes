// Instead of
this.setState({showPagination: !this.state.showPagination})

// Do it
this.setState((state, props) => {
  return { showPagination: !state.showPagination };
))
