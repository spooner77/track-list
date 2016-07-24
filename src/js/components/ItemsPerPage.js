var React = require('react');
var PaginationItem = require('./PaginationItem');
var _ = require('underscore');

var ItemsPerPage = React.createClass({

  propTypes: {
    perPage: React.PropTypes.number,
    itemsPerPageList: React.PropTypes.array,
    itemsCount: React.PropTypes.number,
    handleItemsCountClick: React.PropTypes.func
  },

  render: function() {
    if ( !this.props.itemsPerPageList || this.props.itemsCount < _.min(this.props.itemsPerPageList) )
    {
      return null;
    }

    var itemsPerPage = this.getItemsPerPageList();

    return (
        <ul className="pagination tracklist-items-per_page">
          {itemsPerPage}
        </ul>
    )
  },

  getItemsPerPageList: function() {
    var rows = [];

    // render items
    this.props.itemsPerPageList.map(function(item) {
      var pageClass = (this.props.perPage === item) ? 'active' : '';
      rows.push(<PaginationItem
                  key={item}
                  itemClass={pageClass}
                  onHandleClick={this.props.handleItemsCountClick.bind(null, item)}
                  label={item} />);
    }.bind(this));

    return rows;
  }
});

module.exports = ItemsPerPage;
