Ext.define('Admin.core.field.CurrencyField',{
	extend 		: 'Ext.form.field.Text',
	labelAlign	: 'left',
    labelStyle	: 'font-weight:bold',
    width 		: '100%',
	allowBlank 	: false,
	config		: {
		currencySign 		: '$',
		thousandSeparator	: ',',
		currencyPrecision	: 2,
		allowDecimals 		: true,
		decimalSeparator	: '.'
	},
	labelWidth	: 180,
	alias		: 'widget.currencyField',
	selectOnFocus  : true,
	msgTarget	: 'side',
	value		: 0,
	tooltip 	: '',
	fieldStyle	: 'text-align: right;',
	enableKeyEvents		: true,
	disableKeyFilter 	: true,
	initComponent: function(){
		let 
			me	= this;
		if(me.allowDecimals || (Ext.isEmpty(me.decimalSeparator) || Ext.isEmpty(me.thousandSeparator))){ 
			me.decimalSeparator = '.';
			me.thousandSeparator = ',';
		};
		me.callParent(arguments);
	},
	processRawValue : function(value){
		return this.parseValue(value);
	},
	/**
     * Uses {@link #getErrors} to build an array of validation errors. If any errors are found, they are passed to
     * {@link #markInvalid} and false is returned, otherwise true is returned.
     *
     * Previously, subclasses were invited to provide an implementation of this to process validations - from 3.2
     * onwards {@link #getErrors} should be overridden instead.
     *
     * @param {Object} value The value to validate
     * @return {Boolean} True if all validations passed, false if one or more failed
     */
	validateValue: function(value) {
        var me = this,
            errors = me.getErrors(value),
            isValid = Ext.isEmpty(errors);
 
        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                me.markInvalid(errors);
            }
        }
 
        return isValid;
    },
	setValue: function(value){
		let 
			me	= this;
		Admin.core.field.CurrencyField.superclass.setValue.call(me, value);       
		me.setRawValue(me.getFormattedValue(me.getValue()));
	},
	/**
     * Runs all of Number's validations and returns an array of any errors. Note that this first runs Text's
     * validations, so the returned array is an amalgamation of all field errors. The additional validations run test
     * that the value is a number, and that it is within the configured min and max values.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
	getErrors: function(value) {
		value = arguments.length ? (value == null ? '' : value) : this.processRawValue(this.getRawValue());
 
        var me = this,
            errors = me.callParent([value]),
            validator = me.validator,
            vtype = me.vtype,
            vtypes = Ext.form.field.VTypes,
            regex = me.regex,
            format = Ext.String.format,
            msg, trimmed, isBlank;
 
        if (Ext.isFunction(validator)) {
            msg = validator.call(me, value);
            if (msg !== true) {
                errors.push(msg);
            }
		}
		
		if(isNaN(value)){
			errors.push('Deber ser un numero.');
		}
 
        trimmed = me.allowOnlyWhitespace ? value : Ext.String.trim(value);
 
        if (trimmed.length < 1) {
            if (!me.allowBlank) {
                errors.push(me.blankText);
            }
            // If we are not configured to validate blank values, there cannot be any additional errors 
            if (!me.validateBlank) {
                return errors;
            }
            isBlank = true;
        }
 
        // If a blank value has been allowed through, then exempt it from the minLength check. 
        // It must be allowed to hit the vtype validation. 
        if (!isBlank && value.length < me.minLength) {
            errors.push(format(me.minLengthText, me.minLength));
        }
 
        if (value.length > me.maxLength) {
            errors.push(format(me.maxLengthText, me.maxLength));
        }
 
        if (vtype) {
            if (!vtypes[vtype](value, me)) {
                errors.push(me.vtypeText || vtypes[vtype +'Text']);
            }
        }
 
        if (regex && !regex.test(value)) {
            errors.push(me.regexText || me.invalidText);
        }
		
        return errors;
	},
	
	getFormattedValue: function(value){
		let 
			me	= this;
		if(!value) return value;
		if(value.lastIndexOf(me.currencySign) >= 0) return value;
        if (Ext.isEmpty(value) || !this.hasFormat()) return value;

		if (me.decimalPrecision > 4 ){
			me.decimalPrecision = 2;
		}
		
		if (Ext.isEmpty(me.thousandSeparator) || Ext.isEmpty(me.decimalSeparator))
			throw ('NumberFormatException: invalid thousandSeparator or decimalSeparator, property must has a valid character.');
		
		if (me.thousandSeparator == me.decimalSeparator)
			throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
		
		value = value.toString();
		Ext.util.Format.thousandSeparator 	= me.thousandSeparator;	
		Ext.util.Format.decimalSeparator 	= me.decimalSeparator;	
		Ext.util.Format.currencyPrecision 	= me.currencyPrecision;	
		Ext.util.Format.currencySign 		= me.currencySign;	
		
		value	= Ext.util.Format.usMoney(value);
		return value ;
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(value){
		//Replace the currency symbol and thousand separator
		let 
			me = this;
		if(!value) return value;
		if(value.lastIndexOf(me.currencySign) == -1) return value;
		return me.removeFormat(value);
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} value
     */
    removeFormat: function(value){
		let 
			me	= this;
		if (Ext.isEmpty(value) || !me.hasFormat()) return value;
		if(value.lastIndexOf(me.currencySign) == -1) return value;
		value = value.toString().replace(me.currencySign, '');
		value = value.replace(new RegExp('[' + me.thousandSeparator + ']', 'g'), '');
		return value;
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} value
     */
    hasFormat: function(){
		let 
			me	= this;
        return !Ext.isEmpty(me.decimalSeparator) && !Ext.isEmpty(me.thousandSeparator) &&  !Ext.isEmpty(me.currencySign);
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
		let 
			me		= this;
		if(me.readOnly) return;
		me.setRawValue(me.removeFormat(me.getRawValue()));
        me.callParent(arguments);
	},
	onFocusLeave : function ( e ){
		let 
			me = this;
		if(me.readOnly) return;
		value	= me.getRawValue();
		if(value.lastIndexOf(me.currencySign) >= 0) return;
		me.setRawValue(me.getFormattedValue(me.getRawValue()));
        me.callParent(arguments);
	},
    listeners: {
	    'focus' : function (curreccyField, event, eOpts) {
	        var me = this;
	        if (!Ext.isEmpty(this.tooltip)) {
	            new Ext.ToolTip({
	                target : this.id,
	                trackMouse : true,
	                maxWidth : 300,
	                minWidth : 100,
	                html : '<p align="justify">'+ this.tooltip +'</p>'
	            });
	        }
	    }
	}
});