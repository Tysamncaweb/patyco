/* Copyright 2016 David Gómez Quilón <david.gomez@aselcis.com>
   Copyright 2018 David Vidal <david.vidal@tecnativa.com>
   License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
*/

odoo.define('paty_pos.screens', function (require) {
    "use strict";

    var screens = require('point_of_sale.screens');


    screens.PaymentScreenWidget.include({
        validate_order: function (force_validate) {
            /*var below_limit = this.pos.get_order().get_total_with_tax() <= this.pos.config.l10n_es_simplified_invoice_limit;*/
            if (this.pos.config.iface_l10n_es_simplified_invoice) {
                var order = this.pos.get_order();
                if (!order.to_invoice) {
                    order.set_simple_inv_number();
                } else {
                    // Force invoice above limit. Online is needed.
                    order.to_invoice = true;
                }
            }
            this._super(force_validate);
        },
    });

});
