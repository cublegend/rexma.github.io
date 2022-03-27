'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectList = function (_React$Component) {
  _inherits(ProjectList, _React$Component);

  function ProjectList() {
    _classCallCheck(this, ProjectList);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ProjectList.prototype.createProjectListItem = function createProjectListItem(project) {
    var byline = project.acf.project_byline;
    var client = project.acf.project_client;
    return React.createElement(
      'li',
      { key: 'project-' + project.id },
      React.createElement(
        'a',
        { to: '/projects/' + project.slug },
        React.createElement(
          'h3',
          { className: 'projectlist--client' },
          client
        ),
        React.createElement(
          'h4',
          { className: 'projectlist--byline' },
          byline
        )
      )
    );
  };

  ProjectList.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'project-list' },
      React.createElement(
        'ul',
        { className: 'menu vertical' },
        this.props.projects.map(this.createProjectListItem)
      )
    );
  };

  return ProjectList;
}(React.Component);

var ProjectCategory = function (_React$Component2) {
  _inherits(ProjectCategory, _React$Component2);

  function ProjectCategory(props) {
    _classCallCheck(this, ProjectCategory);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.setActive = _this3.setActive.bind(_this3);

    _this3.state = {
      projects: []
    };
    return _this3;
  }

  ProjectCategory.prototype.componentWillMount = function componentWillMount() {
    this.getProjects();
  };

  ProjectCategory.prototype.getProjects = function getProjects() {
    var _this = this;
    var catid = this.props.cat.id;
    var url = 'http://beta.json-generator.com/api/json/get/EyrhxmRVz';
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      _this.setState({ projects: json });
    });
  };

  ProjectCategory.prototype.getBackground = function getBackground(i) {
    var _this = this;

    // let bgArray = this.state.projects.map(function(project){
    //   return project.acf.project_thumbnail
    // });

    var bg = this.props.cat.thumbnail;

    return bg;
  };

  ProjectCategory.prototype.setActive = function setActive() {
    this.props.handleClick(this.props.Index);
  };

  ProjectCategory.prototype.getWidth = function getWidth(isActive) {
    var w = 'calc(20vw - 20px)';
    if (isActive) {
      w = '500px';
    }
    return w;
  };

  ProjectCategory.prototype.render = function render() {
    // console.log(this.state.projects)
    var name = this.props.cat.name;
    var thumbnail = this.getBackground();

    var _props = this.props;
    var active = _props.active;
    var focused = _props.focused;
    var shiftLeft = _props.shiftLeft;
    var isLast = _props.isLast;

    var styles = {
      container: {
        transform: function () {
          return active ? 'scale(1.1) translate3d(0, 0, 0)' : 'scale(1) translate3d(0, 0, 0)';
        }()
      }, item: {
        transform: function () {
          var direction = shiftLeft ? '-' : '';
          var transform = 'translate3d(0, 0, 0)';
          if (focused) {
            if (!active) {
              transform = 'translate3d(' + direction + '100%, 0, 0)';
            }
          }
          return transform;
        }()
      }, background: {
        background: 'url(' + thumbnail + ') no-repeat center center',
        backgroundSize: 'cover',
        height: '500px',
        width: this.getWidth(active)
      }
    };
    var classes = classNames({ category: true, isActive: active, isLast: isLast, shiftLeft: shiftLeft });
    return React.createElement(
      'li',
      { className: classes, style: styles.item },
      React.createElement(
        'div',
        { className: 'category--content' },
        React.createElement(
          'h2',
          null,
          name
        ),
        React.createElement(ProjectList, { projects: this.state.projects })
      ),
      React.createElement(
        'div',
        { className: 'category--image-container', onClick: this.setActive, style: styles.container },
        React.createElement('div', { className: 'category--image', style: styles.background })
      ),
      React.createElement(
        'div',
        { className: 'category--name' },
        React.createElement(
          'h6',
          null,
          name
        )
      ),
      React.createElement(
        'div',
        { className: 'category--closeButton' },
        React.createElement(
          'a',
          { href: '#' },
          'Back'
        )
      )
    );
  };

  return ProjectCategory;
}(React.Component);

var Collection = function (_React$Component3) {
  _inherits(Collection, _React$Component3);

  function Collection(props) {
    _classCallCheck(this, Collection);

    var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this4._handleClick = _this4._handleClick.bind(_this4);
    _this4.categoryNode = _this4.categoryNode.bind(_this4);
    _this4._focusOff = _this4._focusOff.bind(_this4);

    _this4.state = {
      open: false,
      activeIndex: null,
      categories: []
    };
    return _this4;
  }

  Collection.prototype.componentDidMount = function componentDidMount() {
    this._getCategories();
  };

  Collection.prototype._getCategories = function _getCategories() {
    var _this = this;
    var url = 'http://beta.json-generator.com/api/json/get/E1NpHQAEf';
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      _this.setState({ categories: json });
    });
  };

  Collection.prototype._handleClick = function _handleClick(i) {
    this.setState({
      activeIndex: i,
      open: true
    });
  };

  Collection.prototype._focusOff = function _focusOff(e) {
    e.preventDefault();
    if (e.target.className !== 'category--image') {
      this.setState({
        activeIndex: null,
        open: false
      });
    }
  };

  Collection.prototype.categoryNode = function categoryNode(cat, i) {
    var isLast = i === this.state.categories.length - 1 || i === this.state.categories.length - 2;
    var shiftLeft = i < this.state.activeIndex;

    return React.createElement(ProjectCategory, {
      cat: cat,
      key: 'cat-' + i,
      handleClick: this._handleClick,
      active: i === this.state.activeIndex,
      focusOff: this._focusOff,
      focused: this.state.open,
      shiftLeft: shiftLeft,
      Index: i,
      isLast: isLast
    });
  };

  Collection.prototype.render = function render() {
    var catNodes = this.state.categories.map(this.categoryNode);
    var classes = classNames({
      focused: this.state.open
    });
    return React.createElement(
      'div',
      { className: 'categories--menu-container ' + classes, onClick: this._focusOff, style: { height: window.innerHeight } },
      React.createElement(
        'ul',
        { className: 'categories menu' },
        catNodes
      )
    );
  };

  return Collection;
}(React.Component);

var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(Collection, null)
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));