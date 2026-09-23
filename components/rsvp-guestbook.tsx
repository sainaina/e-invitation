'use client'

import { useState } from 'react'
import { Heart, Send, CheckCircle2, QrCode, Gift, Sparkles, UserCheck, MessageSquareHeart } from 'lucide-react'

interface Blessing {
  id: string
  name: string
  relation: string
  message: string
  attending: boolean
  guests: number
  date: string
}

interface RsvpGuestbookProps {
  lang?: 'en' | 'km'
}

export default function RsvpGuestbook({ lang = 'km' }: RsvpGuestbookProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [guestsCount, setGuestsCount] = useState('2')
  const [attendanceDay, setAttendanceDay] = useState<'both' | 'day1' | 'day2'>('both')
  const [wishes, setWishes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const [blessings, setBlessings] = useState<Blessing[]>([
    {
      id: '1',
      name: 'Oknha Bun & Lok Chumteav',
      relation: 'Family Friend',
      message: 'សូមជូនពរក្មួយទាំងពីរជួបតែសុភមង្គល និងស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង! May your marriage be filled with endless love, prosperity, and joy.',
      attending: true,
      guests: 2,
      date: 'Just now',
    },
    {
      id: '2',
      name: 'Dara & Sophea',
      relation: 'University Friends',
      message: 'Congratulations Rithy & Nihyun! So thrilled to witness your royal celebration at Premier Sensok Center. You two are made for each other!',
      attending: true,
      guests: 2,
      date: '1 hour ago',
    },
    {
      id: '3',
      name: 'Alice Meng',
      relation: 'Bridal Party',
      message: 'The most gorgeous bride and handsome groom! Can’t wait for both Day 1 traditional ceremony and Day 2 reception! With so much love ❤️',
      attending: true,
      guests: 1,
      date: '3 hours ago',
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: attending === 'yes' ? 'Attending Guest' : 'Well Wisher',
      message: wishes.trim() || (lang === 'km' ? 'សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មីមានសុភមង្គលរៀងរហូត!' : 'Wishing the newlyweds a lifetime of unconditional love and blessing!'),
      attending: attending === 'yes',
      guests: attending === 'yes' ? parseInt(guestsCount, 10) : 0,
      date: 'Just now',
    }

    setBlessings([newBlessing, ...blessings])
    setSubmitted(true)
  }

  return (
    <div className="space-y-6 px-3">
      {/* RSVP Form Card */}
      <div className="fade-left delay-100 rounded-2xl border-2 border-[#330404]/30 bg-white/40 p-5 shadow-sm transition-all duration-300 hover:border-[#330404]">
        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#330404]/10 text-[#330404]">
            <MessageSquareHeart className="h-5 w-5" />
          </div>
          <h3 className="mt-2 font-moul text-lg text-[#330404]">
            {lang === 'km' ? 'ការបញ្ជាក់វត្តមានចូលរួម' : 'RSVP & Guest Attendance'}
          </h3>
          <p className="mt-1 font-moulpali text-xs text-[#5f682a]">
            {lang === 'km'
              ? 'សូមមេត្តាឆ្លើយតបមុនថ្ងៃទី ០១ ខែធ្នូ ឆ្នាំ ២០២៥'
              : 'Kindly respond before 1st December 2025'}
          </p>
        </div>

        {submitted ? (
          <div className="mt-5 rounded-xl border border-[#5f682a]/30 bg-[#FAF7F2] p-4 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-[#5f682a]" />
            <h4 className="mt-2 font-moul text-base text-[#330404]">
              {lang === 'km' ? 'សូមអរគុណសម្រាប់ការឆ្លើយតប!' : 'Thank You for Confirming!'}
            </h4>
            <p className="mt-1 font-moulpali text-xs text-[#5f682a]">
              {lang === 'km'
                ? 'សារជូនពរ និងការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាទុកយ៉ាងកក់ក្តៅ។'
                : 'Your attendance and blessing have been warmly recorded.'}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 font-moulpali text-xs font-medium text-[#330404] underline hover:text-[#5f682a]"
            >
              {lang === 'km' ? 'កែសម្រួលការឆ្លើយតប' : 'Submit another response'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                {lang === 'km' ? 'នាម និង គោត្តនាម *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'km' ? 'ឧ. លោក / លោកស្រី...' : 'e.g. Mr. John Doe & Guest'}
                className="mt-1 w-full rounded-xl border border-[#330404]/40 bg-white px-3 py-2 text-sm text-[#330404] placeholder-stone-400 focus:border-[#330404] focus:outline-none focus:ring-1 focus:ring-[#330404]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                  {lang === 'km' ? 'លេខទូរស័ព្ទ / Telegram' : 'Phone / Telegram'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012 345 678"
                  className="mt-1 w-full rounded-xl border border-[#330404]/40 bg-white px-3 py-2 text-sm text-[#330404] placeholder-stone-400 focus:border-[#330404] focus:outline-none focus:ring-1 focus:ring-[#330404]"
                />
              </div>

              <div>
                <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                  {lang === 'km' ? 'ចំនួនភ្ញៀវ' : 'No. of Guests'}
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#330404]/40 bg-white px-3 py-2 text-sm text-[#330404] focus:border-[#330404] focus:outline-none focus:ring-1 focus:ring-[#330404]"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4+ Family</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                {lang === 'km' ? 'វត្តមានរបស់អ្នក' : 'Will you be attending?'}
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`rounded-xl border px-3 py-2 text-xs font-moulpali transition ${attending === 'yes'
                      ? 'border-[#330404] bg-[#330404] text-white shadow-xs'
                      : 'border-stone-300 bg-white text-stone-700 hover:border-[#330404]'
                    }`}
                >
                  {lang === 'km' ? '✓ ខ្ញុំរីករាយចូលរួម' : '✓ Joyfully Attend'}
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`rounded-xl border px-3 py-2 text-xs font-moulpali transition ${attending === 'no'
                      ? 'border-[#330404] bg-[#330404] text-white shadow-xs'
                      : 'border-stone-300 bg-white text-stone-700 hover:border-[#330404]'
                    }`}
                >
                  {lang === 'km' ? '✕ សុំទោស មិនអាចចូលរួម' : '✕ Regretfully Decline'}
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <div>
                <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                  {lang === 'km' ? 'កម្មវិធីដែលអ្នកចូលរួម' : 'Ceremony Attending'}
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-[11px] font-moulpali">
                  <button
                    type="button"
                    onClick={() => setAttendanceDay('both')}
                    className={`rounded-xl border p-1.5 transition ${attendanceDay === 'both'
                        ? 'border-[#5f682a] bg-[#5f682a] text-white'
                        : 'border-stone-200 bg-white text-stone-700'
                      }`}
                  >
                    {lang === 'km' ? 'ទាំងពីរថ្ងៃ' : 'Both Days'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendanceDay('day1')}
                    className={`rounded-xl border p-1.5 transition ${attendanceDay === 'day1'
                        ? 'border-[#5f682a] bg-[#5f682a] text-white'
                        : 'border-stone-200 bg-white text-stone-700'
                      }`}
                  >
                    {lang === 'km' ? 'ថ្ងៃ ១៧ (សែន)' : 'Dec 17 (Tea)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendanceDay('day2')}
                    className={`rounded-xl border p-1.5 transition ${attendanceDay === 'day2'
                        ? 'border-[#5f682a] bg-[#5f682a] text-white'
                        : 'border-stone-200 bg-white text-stone-700'
                      }`}
                  >
                    {lang === 'km' ? 'ថ្ងៃ ១៨ (ជប់លៀង)' : 'Dec 18 (Reception)'}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block font-moulpali text-xs font-semibold text-[#5f682a]">
                {lang === 'km' ? 'ពាក្យជូនពរដល់គូស្វាមីភរិយាថ្មី' : 'Wedding Blessings & Wishes'}
              </label>
              <textarea
                rows={3}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder={
                  lang === 'km'
                    ? 'សូមសរសេរសារជូនពរដល់កូនកំលោះ និងកូនក្រមុំ...'
                    : 'Write a warm blessing to Rithy & Nihyun...'
                }
                className="mt-1 w-full rounded-xl border border-[#330404]/40 bg-white px-3 py-2 text-sm text-[#330404] placeholder-stone-400 focus:border-[#330404] focus:outline-none focus:ring-1 focus:ring-[#330404]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#330404] py-2.5 font-cinzel text-xs font-semibold tracking-wider text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#5f682a]"
            >
              <Send className="h-4 w-4" />
              <span>{lang === 'km' ? 'ផ្ញើការឆ្លើយតប និងពរជ័យ' : 'Send RSVP & Blessing'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Digital Red Envelope / Wedding Gift Box */}
      <div className="fade-right delay-150 rounded-2xl border-2 border-[#330404]/30 bg-white/90 p-4 shadow-xs text-center">
        <div className="flex items-center justify-center gap-2 text-[#330404]">
          <Gift className="h-4 w-4" />
          <h4 className="font-moul text-sm tracking-wider text-[#330404]">
            {lang === 'km' ? 'ចំណងដៃអាពាហ៍ពិពាហ៍ (Digital Gift)' : 'Wedding Blessing Gift'}
          </h4>
        </div>
        <p className="mt-1 font-moulpali text-xs text-[#5f682a]">
          {lang === 'km'
            ? 'វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នកគឺជាកិត្តិយសដ៏ធំធេងបំផុតសម្រាប់យើងខ្ញុំ'
            : 'Your heartfelt presence is the greatest gift of all.'}
        </p>

        <button
          onClick={() => setShowQr(!showQr)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#330404]/50 bg-white px-4 py-1.5 font-moulpali text-xs text-[#330404] shadow-2xs transition hover:bg-[#330404] hover:text-white"
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>{showQr ? (lang === 'km' ? 'បិទ QR' : 'Hide QR') : (lang === 'km' ? 'បង្ហាញ QR ធនាគារ (ABA / ACLEDA)' : 'View Digital Gift QR')}</span>
        </button>

        {showQr && (
          <div className="mt-3 rounded-xl border border-[#330404]/30 bg-[#FAF7F2] p-3 shadow-inner max-w-xs mx-auto animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-[#330404]/40 bg-white">
              <div className="text-center p-2">
                <QrCode className="mx-auto h-12 w-12 text-[#330404]" />
                <p className="mt-1 font-cinzel text-[10px] font-bold text-[#330404]">KHQR • ABA / ACLEDA</p>
                <p className="text-[9px] font-cinzel text-[#5f682a]">001 234 567 (RITHY &amp; NIHYUN)</p>
              </div>
            </div>
            <p className="mt-2 font-cinzel text-[10px] text-stone-600">
              Account Name: NEOU RITHYVONG &amp; CHHIV EXNGY
            </p>
          </div>
        )}
      </div>

      {/* Guest Blessings Feed */}
      <div className="fade-left delay-200 space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 fill-current text-[#330404]" />
            <span className="font-moul text-sm text-[#330404]">
              {lang === 'km' ? 'ពាក្យជូនពរពីភ្ញៀវកិត្តិយស' : 'Wishes from Family & Friends'}
            </span>
          </div>
          <span className="rounded-full bg-[#5f682a]/15 px-2.5 py-0.5 font-moulpali text-[11px] text-[#5f682a]">
            {blessings.length} {lang === 'km' ? 'ពរជ័យ' : 'Blessings'}
          </span>
        </div>

        <div className="space-y-2">
          {blessings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-[#330404]/20 bg-white/80 p-3 shadow-2xs backdrop-blur transition hover:border-[#330404]/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-moul text-xs text-[#330404]">{b.name}</span>
                <span className="text-[10px] text-stone-500">{b.date}</span>
              </div>
              <p className="mt-1 font-moulpali text-xs leading-relaxed text-[#330404] italic">
                &ldquo;{b.message}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
