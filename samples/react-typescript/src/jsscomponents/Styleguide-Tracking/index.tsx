import * as React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { trackingApi } from '@sitecore-jss/sitecore-jss-tracking';
import { dataFetcher } from '../../dataFetcher';
import StyleguideSpecimen from '../Styleguide-Specimen';
import { getSitecoreApiHost, getSitecoreApiKey } from '../../AppGlobals';

/* eslint-disable no-alert,no-undef */
type StyleguideTrackingProps = {
  sitecoreContext: any;
};

/**
 * Demonstrates analytics tracking patterns (xDB)
 */
class StyleguideTracking extends React.Component<StyleguideTrackingProps> {
  private event = React.createRef<HTMLInputElement>();
  private goal = React.createRef<HTMLInputElement>();
  private outcomeName = React.createRef<HTMLInputElement>();
  private outcomeValue = React.createRef<HTMLInputElement>();
  private campaign = React.createRef<HTMLInputElement>();
  private pageId = React.createRef<HTMLInputElement>();
  private pageUrl = React.createRef<HTMLInputElement>();
  private trackingApiOptions: any;

  constructor(props: StyleguideTrackingProps) {
    super(props);

    this.submitEvent = this.submitEvent.bind(this);
    this.submitGoal = this.submitGoal.bind(this);
    this.submitOutcome = this.submitOutcome.bind(this);
    this.triggerCampaign = this.triggerCampaign.bind(this);
    this.submitPageView = this.submitPageView.bind(this);
    this.submitBatching = this.submitBatching.bind(this);
    this.abandonSession = this.abandonSession.bind(this);

    this.trackingApiOptions = {
      host: getSitecoreApiHost(),
      querystringParams: {
        sc_apikey: getSitecoreApiKey(),
      },
      fetcher: dataFetcher,
    };
  }

  public render(): JSX.Element {
    const disconnectedMode = this.props.sitecoreContext.itemId === 'available-in-connected-mode';

    return (
      <StyleguideSpecimen {...this.props} e2eId="styleguide-tracking">
        {disconnectedMode && (
          <p>The tracking API is only available in connected, integrated, or headless modes.</p>
        )}
        {!disconnectedMode && (
          <div>
            <p className="alert alert-warning">
              Note: The JSS tracker API is disabled by default. Consult the <a href="https://jss.sitecore.com/docs/fundamentals/services/tracking">tracking documentation</a> to enable it.
            </p>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Event</legend>
                <p>
                  Events are defined in <code>/sitecore/system/Settings/Analytics/Page Events</code>
                </p>
                <label htmlFor="event">Event GUID or Name</label>
                <input type="text" id="event" className="form-control" ref={this.event} />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitEvent}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Goal</legend>
                <p>
                  Goals are defined in <code>/sitecore/system/Marketing Control Panel/Goals</code>
                </p>
                <label htmlFor="goal">Goal GUID or Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="goal"
                  ref={this.goal}
                  placeholder="i.e. Register"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitGoal}
                >
                  Submit
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Outcome</legend>
                <p>
                  Outcomes are defined in{' '}
                  <code>/sitecore/system/Marketing Control Panel/Outcomes</code>
                </p>
                <label htmlFor="outcomeName">Outcome GUID or Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="outcomeName"
                  ref={this.outcomeName}
                  placeholder="i.e. Marketing Lead"
                />
                <br />
                <label htmlFor="outcomeValue">Monetary Value (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  id="outcomeValue"
                  ref={this.outcomeValue}
                  placeholder="i.e. 1337.00"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitOutcome}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Campaign</legend>
                <p>
                  Campaigns are defined in{' '}
                  <code>/sitecore/system/Marketing Control Panel/Campaigns</code>
                </p>
                <label htmlFor="campaign">Campaign GUID or Name</label>
                <input type="text" className="form-control" id="campaign" ref={this.campaign} />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.triggerCampaign}
                >
                  Submit
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Page View</legend>
                <p>
                  Track arbitrary page views for custom routing or offline use. Note that Layout
                  Service tracks page views by default unless <code>tracking=false</code> is passed
                  in its query string.
                </p>
                <label htmlFor="pageId">Page Item GUID</label>
                <input
                  type="text"
                  className="form-control"
                  id="pageId"
                  ref={this.pageId}
                  placeholder="i.e. {11111111-1111-1111-1111-111111111111}"
                />
                <br />
                <label htmlFor="pageUrl">Page URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="pageUrl"
                  ref={this.pageUrl}
                  placeholder="i.e. /foo/bar"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitPageView}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Batching</legend>
                <p>
                  The tracking API supports pushing a whole batch of events in a single request.
                  This can be useful for queuing strategies or offline PWA usage.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.submitBatching}
                >
                  Submit Batch of Events
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Interaction Control</legend>
                <p>
                  Tracking data is not pushed into the xConnect service until your session ends on
                  the Sitecore server. Click this button to instantly end your session and flush the
                  data - great for debugging and testing.
                </p>
                <p className="alert alert-warning">
                  Note: By default <em>anonymous</em> contacts will not be shown in Experience
                  Profile. If your interactions are not showing up in Experience Profile, you may
                  need to{' '}
                  <a href="https://doc.sitecore.net/developers/xp/xconnect/xconnect-search-indexer/enable-anonymous-contact-indexing.html">
                    enable anonymous contact indexing.
                  </a>
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.abandonSession}
                >
                  End Interaction
                </button>
              </fieldset>
            </div>
          </div>
        )}
      </StyleguideSpecimen>
    );
  }

  private submitEvent(): void {
    trackingApi
      .trackEvent([{ eventId: this.event.current!.value }], this.trackingApiOptions)
      .then(() => alert('Page event pushed'))
      .catch((error) => alert(error));
  }

  private submitGoal(): void {
    trackingApi
      .trackEvent([{ goalId: this.goal.current!.value }], this.trackingApiOptions)
      .then(() => alert('Goal pushed'))
      .catch((error) => alert(error));
  }

  private submitOutcome(): void {
    trackingApi
      .trackEvent(
        [
          {
            url: this.pageUrl.current!.value,
            pageId: this.pageId.current!.value,
            outcomeId: this.outcomeName.current!.value,
            currencyCode: 'USD',
            monetaryValue: this.outcomeValue.current!.value,
          },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Outcome pushed'))
      .catch((error) => alert(error));
  }

  private triggerCampaign(): void {
    trackingApi
      .trackEvent([{ campaignId: this.campaign.current!.value }], this.trackingApiOptions)
      .then(() => alert('Campaign set'))
      .catch((error) => alert(error));
  }

  private submitPageView(): void {
    trackingApi
      .trackEvent(
        [{ pageId: this.pageId.current!.value, url: this.pageUrl.current!.value }],
        this.trackingApiOptions
      )
      .then(() => alert('Page view pushed'))
      .catch((error) => alert(error));
  }

  private abandonSession(): void {
    const abandonOptions = {
      action: 'flush',
      ...this.trackingApiOptions,
    };

    trackingApi
      .trackEvent([], abandonOptions)
      .then(() => alert('Interaction has been terminated and its data pushed to xConnect.'))
      .catch((error) => alert(error));
  }

  private submitBatching(): void {
    trackingApi
      .trackEvent(
        [
          { eventId: 'Download' },
          { goalId: 'Instant Demo' },
          { outcomeId: 'Opportunity' },
          { pageId: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}', url: '/arbitrary/url/you/own' },
          // this goal will be added to the new page/route ID set above, not the current route
          { goalId: 'Register' },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Batch of events pushed'))
      .catch((error) => alert(error));
  }
}

export default withSitecoreContext()(StyleguideTracking);
