// SurveyNew shows components SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() =>
          this.setState({
            showFormReview: true
          })
        }
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// this placed here will clear the form when click Cancel or any other link
// that takes you away from the form (SurveyNew)
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
