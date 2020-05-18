import React, { Component } from 'react';
import PropTypes from 'prop-types';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default class Mifiel extends Component {
  static propTypes = {
    widgetId: PropTypes.string.isRequired,
    successButtonText: PropTypes.string,
    pdf: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.string || PropTypes.number,
    height: PropTypes.string || PropTypes.number,
    id: PropTypes.string,
    sandbox: PropTypes.bool,
  };

  static displayName = 'mifiel';

  constructor(props) {
    super(props);

    const {
      widgetId,
      id,
      successButtonText,
      pdf,
      color,
      width,
      height,
      sandbox,
    } = props;

    if (!(widgetId && id) || !canUseDOM) {
      return;
    }

    window.mifielSettings = {
      widgetId,
      appendTo: id,
      successBtnText: successButtonText,
      pdf,
      color,
      width,
      height,
    };

    if (!window.mifiel) {
      (function (window, document) {
        'use strict';
        if (!document.getElementById('mifiel-js')) {
          const script = document.createElement('script');
          script.async = !0;
          script.id = 'mifiel-js';
          script.type = 'text/javascript';
          script.src = sandbox
            ? 'https://sandbox.mifiel.com/sign-widget-v1.0.0.js'
            : 'https://www.mifiel.com/sign-widget-v1.0.0.js';
          document.body.appendChild(script);
          // foundScript.parentNode.insertBefore(script, foundScript);
          // script.parentNode.insertBefore(r, o)
          // var r = document.createElement('script'),
          //   o = document.getElementsByTagName('script')[0];
          // (r.type = 'text/javascript'),
          //   (r.id = 'mifiel-js'),
          //   (r.async = !0),
          //   (r.src = 'https://www.mifiel.com/sign-widget-v1.0.0.js'),
          //   o.parentNode.insertBefore(r, o);
        }
        window.mifiel = window.mifiel || [];
        for (
          var e = ['widget'],
            i = function (e) {
              return function () {
                window.mifiel.push(
                  [e].concat(Array.prototype.slice.call(arguments, 0)),
                );
              };
            },
            t = 0;
          t < e.length;
          t++
        ) {
          var n = e[t];
          window.mifiel[n] || (window.mifiel[n] = i(n));
        }
      })(window, document);
    }

    if (window.mifiel) {
      window.mifiel.widget({ ...window.mifielSettings, appendTo: id });
    }
  }

  componentDidUpdate() {
    if (!canUseDOM) return;

    const {
      widgetId,
      id,
      successButtonText,
      pdf,
      color,
      width,
      height,
    } = this.props;

    window.mifielSettings = {
      widgetId,
      appendTo: id,
      successBtnText: successButtonText,
      pdf,
      color,
      width,
      height,
    };

    if (window.mifiel) {
      window.mifiel.widget({
        ...window.mifielSettings,
      });
    }
  }

  componentWillUnmount() {
    if (!canUseDOM || !window.mifiel) return false;

    delete window.mifiel;
    delete window.mifielSettings;
  }

  render() {
    const { className, id } = this.props;
    return <div className={className} id={id} />;
  }
}

Mifiel.defaultProps = {
  successButtonText: 'OK',
  id: 'mifiel_id',
  sandbox: true,
};
