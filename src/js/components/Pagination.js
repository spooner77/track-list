var React = require('react');
var PaginationItem = require('./PaginationItem');
var _ = require('underscore');

var Pagination = React.createClass({

  propTypes: {
    page: React.PropTypes.number,
    pagesCount: React.PropTypes.number,
    handlePageClick: React.PropTypes.func
  },

  render: function() {
    if ( this.props.pagesCount ==  0 )
    {
      return null;
    }
    var pages = this.getPagesList();

    return (
        <ul className="pagination tracklist-pagination">
          {pages}
        </ul>
    )
  },

  getPagesList: function() {
    var rows = [];
    var list = _.range(1,this.props.pagesCount+1);

    // render items
    list.map((function(item) {
        var pageClass = (this.props.page === item) ? 'active' : '';
        rows.push(<PaginationItem
                    key={item}
                    itemClass={pageClass}
                    onHandleClick={this.props.handlePageClick.bind(null, item)}
                    label={item} />);
    }).bind(this));

    // render side's arrows
    if ( this.props.pagesCount > 1 ) {
      var prevClass = "";
      var nextClass = "";

      if ( this.props.page === 1 ) {
        prevClass = "disabled";
      }
      if ( this.props.page === this.props.pagesCount ) {
        nextClass = "disabled";
      }

      rows.unshift(<PaginationItem
        itemClass={prevClass}
        key="prev"
        onHandleClick={this.props.handlePageClick.bind(null, (this.props.page-1))}
        label="&laquo;" /> );

      rows.push(<PaginationItem
        itemClass={nextClass}
        key="next"
        onHandleClick={this.props.handlePageClick.bind(null, (this.props.page+1))}
        label="&raquo;" />);
    }

    return rows
  }
});

module.exports = Pagination;
