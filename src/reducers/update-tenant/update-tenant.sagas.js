import { takeLatest, put, call, all, select } from 'redux-saga/effects'

import { UPDATE_TENANT_REQUEST } from './update-tenant.constants'
import { CLS_API_ENDPOINT } from '../../config/backend.config'
import {
  updateTenantSuccess,
  updateTenantFailure,
} from './update-tenant.actions'
import { pusherSubscribe } from '../pusher/pusher.actions'
import LeadsService from '../../services/leads.service'
import { selectLocationUrn } from '../global/global.selectors'
import { selectLeadForm } from './update-tenant.selectors'
import {
  selectLedgerId,
  selectLeadUid,
} from '../rent-now-after/rent-now-after.selectors'
import { selectTenantId } from '../insurance-data/insurance-data.selectors'

const service = new LeadsService({ baseURL: CLS_API_ENDPOINT })

export function* submitUpdateTenantAfterPayment({ payload }) {
  try {
    const state = yield select()
    const locationUrn = selectLocationUrn(state)
    const leadForm = selectLeadForm(state)
    const ledgerId = selectLedgerId(state)
    const leadUid = selectLeadUid(state)
    const tenantId = selectTenantId(state)
    const params = {
      'p-ledger-id': ledgerId,
      'p-lead-uid': leadUid,
      'p-tenant-id': tenantId,
      'p-return-url':
        window.location.origin +
        (window.location.pathname.length > 1 ? window.location.pathname : ''),
      ...payload,
    }
    const lead = new FormData()
    for (let field in params) {
      lead.set(field, params[field])
    }
    const { data: response } = yield service.updateTenant(
      locationUrn,
      leadForm,
      lead,
    )
    const { pusher_app_key, pusher_channel } = response
    yield put(updateTenantSuccess(response))
    yield put(
      pusherSubscribe(
        pusher_app_key,
        pusher_channel,
        'success',
        'update_tenant_',
      ),
    )
  } catch (error) {
    yield put(updateTenantFailure(error))
  }
}

export function* onUpdateTenantRequest() {
  yield takeLatest(UPDATE_TENANT_REQUEST, submitUpdateTenantAfterPayment)
}

export default function* updateTenantSagas() {
  yield all([call(onUpdateTenantRequest)])
}
