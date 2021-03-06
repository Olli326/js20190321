import { Table } from '../Table/Table.js';
import { Portfolio } from '../Portfolio/Portfolio.js';
import { TradeWidget } from '../TradeWidget/TradeWidget.js';


import DataService from '../../services/DataService.js';

export class App {
  constructor({ element }) {
    this._el = element;
    this._userBalance = 10000;
     
    this._render();

    this._data = DataService.getCurrencies();

    this._initPortfolio();
    this._initTradeWidget();

    
    this._initTable(this._data);

  } 
  
  tradeItem(id) {
    const coin = this._data.find(coin => coin.id === id);
    this._tradeWidget.trade(coin)
  }

  _initPortfolio() {
    this._portfolio = new Portfolio({
      element: this._el.querySelector('[data-element="portfolio"]'),
      balance: this._userBalance,
    });
  }

  _initTradeWidget() {
    this._tradeWidget = new TradeWidget({
      element: this._el.querySelector('[data-element="trade-widget"]'),
    })
  }

  _initTable(data) {
    this._table = new Table({
      data,
      element: this._el.querySelector('[data-element="table"]'),
      onRowClick: id => this.tradeItem(id),
    })
  }
    
     _render() {
        this._el.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <h1>Tiny Crypto Market</h1>
                </div>
            </div>
            <div class="row portfolio-row">
                <div class="col s6 offset-s6" data-element="portfolio"></div>
            </div>

            <div class="row">
              <div data-element="table" class="col s12"></div>
            </div>
            <div data-element="trade-widget"></div>
        `;
    }
}
